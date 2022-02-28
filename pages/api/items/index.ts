// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import absoluteUrl from "next-absolute-url";

type Data = {
	status: number;
	data: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { origin } = absoluteUrl(req);

	if (origin.includes("//localhost:")) {
		const RAWitems = fs.readdirSync("NotEnoughUpdates-REPO/items");
		let items: String[] = [];
		let data: any[] = [];

		for (const item of RAWitems) {
			items.push(item.substr(0, item.length - 5));
			data.push(
				JSON.parse(
					fs.readFileSync(`NotEnoughUpdates-REPO/items/${item}`, {
						encoding: "utf8",
						flag: "r",
					})
				)
			);
		}

		fs.writeFileSync(
			"./pages/api/items/main.json",
			JSON.stringify({
				data: data,
				timestamp: Date.now(),
			})
		);
	}

	res.status(200).json({ 
		status: 200, //@ts-ignore
		data: JSON.parse(fs.readFileSync("./pages/api/items/main.json"))
	});
}
