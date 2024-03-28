'use client';
export default function BuyButton({invitationCode}:{invitationCode:string}) {
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(invitationCode).then(r => console.log("copy success")).catch((reason)=>{console.log(reason.toString())})
            window.open('https://baidu.com') //这里是打开新窗口
        }
    }
    return (
        <button
            className="absolute py-2 px-3 flex rounded-md text-l no-underline hover:bg-btn-background-hover border text-white border-amber-50"
            rel="noreferrer"
            onClick={handleClick}
        >
            Copy invitation code and buy now ➔
        </button>
    );
}
