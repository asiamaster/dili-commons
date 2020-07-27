package com.dili.commons.rabbitmq;

import com.google.common.collect.Sets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * 失败消息重新发送任务
 */
public class ReissueTask implements Runnable {

    private static final Logger logger = LoggerFactory.getLogger(ReissueTask.class);

    private RabbitTemplate rabbitTemplate;

    public ReissueTask(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override

    public void run() {
        HashSet all = SendFailedMessageHolder.getAll();
        List<CorrelationDataExt> messageCorrelationDataList = new ArrayList<>(all);
        all.removeAll(messageCorrelationDataList);
        logger.info(String.format("------------------获取到%d条ack=false的消息，准备重发------------------", messageCorrelationDataList.size()));
        int i = 1;
        for (CorrelationDataExt messageCorrelationData : messageCorrelationDataList) {
            Object message = messageCorrelationData.getMessage();
            String messageId = messageCorrelationData.getId();
            logger.info(String.format("------------------重发第%d条消息，id: %s------------------", i, messageId));
            i++;
            rabbitTemplate.convertSendAndReceive(messageCorrelationData.getExchange(), messageCorrelationData.getRoutingKey(),
                    message, messageCorrelationData);
        }
        logger.info("------------------重发完成------------------");
    }



}
