import '@shopify/shopify-api/adapters/node';
import axios from "axios";
import {createClient} from "@/utils/supabase/server";

export async function GET() {
    const supabase = createClient();

    await req(250).then((res) => {
        supabase.from("rank").insert({invitation_code: res});
    }).catch((reason) => {

    });

    return Response.json({code: 200, msg: "", data: {}});
}

async function req(pageSize: number, sinceId?: number): Promise<RankItem[]> {
    const instance = axios.create({
        baseURL: 'https://starpower-market.myshopify.com',
        headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN!.toString(),
        }
    });
    let sinceIdStr = "";

    if (sinceId) {
        sinceIdStr = "&since_id=" + sinceId;
    }
    // sinceIdStr = "&since_id=5865631220031";
    let currentPageIndex = 1;
    const res = await instance.get("/admin/api/2024-01/orders.json?financial_status=any&limit=" + pageSize + sinceIdStr);
    const rankArray: RankItem[] = [];
    for (let i = 0; i < res.data.orders.length; i++) {
        try {
            console.log(res.data.orders[i].billing_address.address2 + ":" + res.data.orders[i].financial_status);
            console.log(res.data.orders[i].id);
            console.log('-------------------------------');
            let order = res.data.orders[i];
            let code = order.billing_address.address2;
            rankArray.push({
                orderId: order.id,
                createdAt: order.customer.created_at ?? "",
                invitationCode: code ?? "",
                countryCode: order.billing_address.country_code ?? "",
                provinceCode: order.billing_address.province_code ?? "",
                email: order.customer.email ?? "",
                firstName: order.customer.first_name ?? "",
                lastName: order.customer.last_name ?? "",
                phone: order.customer.phone ?? "",
            });
        } catch (e) {
            console.log(e);
        }
    }
    return rankArray;
}

interface RankItem {
    orderId: number;
    createdAt: string;
    invitationCode: string;
    countryCode: string;
    provinceCode: string;
    customerInfo: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
}
