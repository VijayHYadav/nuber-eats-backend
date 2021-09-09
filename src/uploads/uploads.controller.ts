import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';

const BUCKET_NAME = "unique bucket name over AWS";

@Controller("uploads")
export class UploadsController {

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        AWS.config.update({
            credentials: {
                accessKeyId: "<YOUR-ACCESS-KEY-ID>",
                secretAccessKey: "<YOUR-SECRET-ACCESS-KEY>"
            }
        });
        try {
            const objectName = `${Date.now() + file.originalName}`
            await new AWS.S3().putObject({
                Body: file.buffer,
                Bucket: BUCKET_NAME,
                Key: objectName,
                ACL: 'public-read',
            }).promise();
            const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
            return { url: fileUrl };

            // const upload = await new AWS.S3().createBucket({
            //     Bucket: "unique bucket name over AWS"
            // }).promise();
            // console.log(upload);
            // console.log(file);
        } catch (error) {
            console.log(error)
        }
    }
}