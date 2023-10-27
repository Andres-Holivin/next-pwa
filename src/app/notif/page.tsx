"use client"
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'

const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const Index = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const [registration, setRegistration] = useState<ServiceWorkerRegistration>(null)


    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            window.addEventListener('push', function (event) {
                console.log("push")
            })
            // console.log(navigator)
            // run only in browser
            navigator.serviceWorker.register("../../public/service-worker.js").then(reg => {
                console.log(reg)
                reg.pushManager.getSubscription().then(sub => {
                    console.log(sub)
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setSubscription(sub)
                        setIsSubscribed(true)
                    }
                })
                setRegistration(reg)
            })
        }
        // subscription.getSubscription().
    }, [])

    const subscribeButtonOnClick = async event => {
        event.preventDefault()
        const appkey = base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
        console.log(registration)
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: appkey
        })
        console.log(registration)
        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        setSubscription(sub)
        setIsSubscribed(true)
        console.log('web push subscribed!')
        console.log(sub)
    }

    const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        await subscription.unsubscribe()
        // TODO: you should call your API to delete or invalidate subscription data on server
        setSubscription(null)
        setIsSubscribed(false)
        console.log('web push unsubscribed!')
    }

    const sendNotificationButtonOnClick = async event => {
        event.preventDefault()
        if (subscription == null) {
            console.error('web push not subscribed')
            return
        }
        console.log(subscription)
        await fetch('/api/notification', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription
            })
        })
    }

    return (
        <>
            <Head>
                <title>next-pwa example</title>
            </Head>
            <h1>Next.js + PWA = AWESOME!</h1>
            <Button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
                Subscribe
            </Button>
            <Button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
                Unsubscribe
            </Button>
            <Button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
                Send Notification
            </Button>
        </>
    )
}

export default Index