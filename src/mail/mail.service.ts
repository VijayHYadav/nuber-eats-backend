import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) { 
        console.log(options);
        this.sendEmail('testing', 'nuber');
    }

    private async sendEmail(subject: string, template: string) {
        const form = new FormData();
        form.append('from', `Excited User <mailgun@${this.options.domain}>`);
        form.append('to', `kuttarohit318@gmail.com`);
        form.append('subject', subject);
        form.append('template', template);
        form.append('v:code', 'randome code');
        form.append('v:username', 'vijay');

        const response = await got.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
            },
            body: form,
        });
        console.log(response.body);
    }
}
