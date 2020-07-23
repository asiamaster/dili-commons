package com.dili.commons.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * Created by asiam on 2019/4/8
 */
@Component
@ConditionalOnClass(RabbitTemplate.class)
public class RabbitProducerConfiguration implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {

    protected static final Logger LOGGER = LoggerFactory.getLogger(RabbitProducerConfiguration.class);

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    //必须是prototype类型
    //rabbitTemplate是thread safe的，主要是channel不能共用，但是在rabbitTemplate源码里channel是threadlocal的，所以singleton没问题。
    //但是rabbitTemplate要设置回调类，如果是singleton，回调类就只能有一个，所以如果想要设置不同的回调类，就要设置为prototype的scope
    //如果需要在生产者需要消息发送后的回调，需要对rabbitTemplate设置ConfirmCallback对象，由于不同的生产者需要对应不同的ConfirmCallback，
    //如果rabbitTemplate设置为单例bean，则所有的rabbitTemplate实际的ConfirmCallback为最后一次申明的ConfirmCallback。
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }

//    @PostConstruct
//    public void init(){
//        rabbitTemplate.setConfirmCallback(this);
//        rabbitTemplate.setReturnCallback(this);
//    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
//        System.out.println("消息唯一标识："+correlationData);
        if (ack) {
            LOGGER.info("消息成功到达Exchange");
        }else{
            // 根据业务逻辑实现消息补偿机制
            if (correlationData instanceof CorrelationDataExt) {
                CorrelationDataExt messageCorrelationData = (CorrelationDataExt) correlationData;
                if (!ack) {
                    //在请求主线程发送1万条消息的过程中，将rabbitmq关闭，这时请求主线程和ConfirmCallback线程都在等待Connection恢复，
                    //然后重新启动rabbitmq，当程序重新建立Connection之后，这两个线程会死锁。
                    //可行的方案：定时任务重发
                    SendFailedMessageHolder.add(messageCorrelationData);
                }
//                LOGGER.error("消息到达Exchange失败，内容:{}，原因:{}", message, cause);
            }
        }
    }

    /**
     * exchange 到达 queue, 则 returnedMessage 不回调
     * exchange 到达 queue 失败, 则 returnedMessage 回调
     * 需要设置spring.rabbitmq.publisher-returns=true
     * @param message
     * @param replyCode
     * @param replyText
     * @param exchange
     * @param routingKey
     */
    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey){
        LOGGER.info("消息报文:{}", new String(message.getBody()));
        LOGGER.info("消息编号:{}", replyCode);
        LOGGER.info("描述:{}", replyText);
        LOGGER.info("交换机名称:{}", exchange);
        LOGGER.info("路由名称:{}", routingKey);
        // 根据业务逻辑实现消息补偿机制

    }
}