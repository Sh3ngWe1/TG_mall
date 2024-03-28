// 'use client';
import BuyButton from "@/components/BuyButton";
import {ApiVersion, shopifyApi} from '@shopify/shopify-api';
import axios from "axios";

export default async function HomePage({params: {invitationToken}}: { params: { invitationToken: string } }) {

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center bg-black">
            <div className="w-full fixed">
                <div className="py-3.5 font-bold bg-gray-200 text-left text-white">
                    <img className="h-8 ml-20"
                         src={"data:image/png;base64,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"}
                         alt={"logo"}/>
                </div>
            </div>
            <div className="text-white text-5xl">Starpower</div>
            <div className="w-full justify-center">
                <video style={{width: "100%", height: "auto", marginTop: "-36%", marginBottom: "-43%"}} muted autoPlay
                       loop={false}
                       playsInline
                       src={"https://www.starpower.world/static/media/H1_black.2f6a05d9.m4v"}></video>
            </div>

            <div className="w-full max-w-4xl flex justify-center items-center p-3 text-sm">
                <BuyButton invitationCode={"1"}/>
            </div>

            <div className="text-white">{invitationToken}</div>
            <footer
                className="w-full border-t border-white border-t-foreground/10 p-8 flex justify-center text-center text-xs text-white">
                <p>
                    Powered by{" "}
                    <a
                        href="https://www.starpower.world"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        STARPOWER
                    </a>
                </p>
            </footer>
        </div>
    );
}
