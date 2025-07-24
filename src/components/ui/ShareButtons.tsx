'use client'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share'
import { FacebookIconShareDesktop, LinkedinIconShareDesktop, WhatsAppIconShareDesktop, XIconShareDesktop } from './Icons'

type Props = {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: Props) {
  return (
    <div className="flex gap-4 mt-8">
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIconShareDesktop />
        {/* <LinkedinIcon size={32} round /> */}
      </LinkedinShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIconShareDesktop />
        {/* <FacebookIcon size={32} round /> */}
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <XIconShareDesktop />
        {/* <TwitterIcon size={32} round /> */}
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsAppIconShareDesktop />
        {/* <WhatsappIcon size={32} round /> */}
      </WhatsappShareButton>
    </div>
  )
}