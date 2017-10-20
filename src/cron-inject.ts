import * as NodeRED from 'node-red';
import { scheduleJob } from 'node-schedule';

interface ICronInjectProperties extends NodeRED.NodeProperties {
    crontab: string;
}

export = (RED: NodeRED.Red) => {
    function CronInjectNode(this: NodeRED.Node, props: ICronInjectProperties) {
        RED.nodes.createNode(this, props);

        const job = scheduleJob(props.crontab, () => {
            this.send({
                payload: Date.now(),
            });
        });

        this.on('close', () => {
            job.cancel();
        });
    }

    RED.nodes.registerType('cron-inject', CronInjectNode);
};
