// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

type Data = {
	data: JSON<any>;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "GET") {
		const RAWitems = fs.readdirSync("NotEnoughUpdates-REPO/items");
		let items: String[] = [];
		let data: JSON[] = [];

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

		res.status(200).json({ test: data });
	} else {
	}
}
