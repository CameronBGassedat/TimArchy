import { Request, Response } from "express";
import Redis from "ioredis";
import {createClient} from 'redis';
import JSONCache from "redis-json";


export class AuthentificationController {
    
    static async signup(req:Request, res:Response){
        let {useremail, userpassword} = req.body

        const user = {
            useremail: useremail,
            userpassword: userpassword
        }

        const redis = new Redis({
            port:6379,
            host:"redis",
        }) as any;

        const jsonCache = new JSONCache<typeof user>(redis, {prefix: 'cache:'});
        console.log(user)
        console.log(useremail)
        const userData = await jsonCache.get(useremail)
        if (userData == undefined){
            await jsonCache.set(useremail, user)
            return res.send({
                signed:true,
                useremail: useremail

            })
        } else {
            return res.send({
                signed: false,
            })
        }
        
    }

    static async login(req:Request, res:Response){
        let {newemail, newpassword} = req.body
        console.log(newemail,"     ",newpassword)
        const redis = new Redis({
            port:6379,
            host:"redis",
        }) as any;
        const user={
            useremail:newemail,
            userpassword:newpassword
        }

        const jsonCache = new JSONCache<typeof user>(redis, {prefix: 'cache:'});

        const userData = await jsonCache.get(newemail)
        

        if(userData != undefined){
            let oldemail = userData!.useremail
            let oldpassword = userData!.userpassword

            if(oldpassword === newpassword){
                res.send({
                    authenticated: true,
                    data: "User valid"
                })
            } else {
                res.send({
                    authenticated:false,
                    data: "Wrong password"
                })
            }
        } else {
            res.send({
                authenticated:false,
                data: "Account not found"
            })
        }
        
    }

}

