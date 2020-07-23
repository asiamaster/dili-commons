package com.dili.commons.rabbitmq;

import org.apache.commons.lang3.StringUtils;
import org.springframework.amqp.AmqpConnectException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * MQ消息服务
 */
@Component
@ConditionalOnClass(RabbitTemplate.class)
public class RabbitMQMessageService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private RabbitProducerConfiguration rabbitProducerConfiguration;

    /**
     * 发送消息
     * 通用服务
     * @param exchange
     * @param routingKey
     * @param json
     * @param confirmCallback
     * @param returnCallback
     */
    public void send(String exchange, String routingKey, String json, RabbitTemplate.ConfirmCallback confirmCallback, RabbitTemplate.ReturnCallback returnCallback) {
        if(StringUtils.isEmpty(exchange) || null == json){
            return;
        }
        String uuid = UUID.randomUUID().toString();
        Message message = MessageBuilder.withBody(json.getBytes())
                .setContentType(MessageProperties.CONTENT_TYPE_JSON)
                .setContentEncoding("utf-8")
                .setMessageId(uuid)
                .build();
        if(confirmCallback == null){
            confirmCallback = rabbitProducerConfiguration;
        }
        if(returnCallback == null){
            returnCallback = rabbitProducerConfiguration;
        }
        this.rabbitTemplate.setReturnCallback(returnCallback);
        this.rabbitTemplate.setConfirmCallback(confirmCallback);

        //使用继承扩展的CorrelationData 、id消息流水号
        CorrelationDataExt correlationData =
                new CorrelationDataExt(uuid);
        correlationData.setMessage(message);
        correlationData.setExchange(exchange);
        correlationData.setRoutingKey(routingKey);
        //有可能长时间retry之后依然不能恢复Connection，如rabbitmq挂掉的情况，不能一直retry下去阻塞接口调用
        //这种情况是没有confirm的，因为消息都没有发出去。所以处理就更简单了
        //retry失败或者没有retry机制都会抛出AmqpConnectException，catch之后将消息保存起来即可
        try{
            this.rabbitTemplate.convertAndSend(exchange, routingKey, message, correlationData);
        }catch (AmqpConnectException e) {
            SendFailedMessageHolder.add(correlationData);
        }
    }
    /**
     * 发送消息
     * 通用服务
     * @param exchange
     * @param routingKey
     * @param json
     */
    public void send(String exchange, String routingKey, String json) {
        send(exchange, routingKey, json, rabbitProducerConfiguration, rabbitProducerConfiguration);
    }
}
