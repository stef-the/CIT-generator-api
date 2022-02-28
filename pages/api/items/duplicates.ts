// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

type Data = {
	status: number;
	data: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
    function displayRename(input: string) {
        let output = "";
        ("§a" + input).split("§").forEach((part) => {
            output += part.substring(1);
        });
        return output;
    }

	try {
        console.log('Local')
		const RAWitems = fs.readdirSync("NotEnoughUpdates-REPO/items");
		let items: String[] = [];
		let duplicates: String[] = [];
		let data: any[] = [];
		let increment: number = 0;

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

		for (const item of data) {
			for (const part of data) {
				//@ts-ignore
				if (
					displayRename(item["displayname"]) ==
					displayRename(part["displayname"])
				) {
					increment = increment + 1;
					if (increment > 1) {
						duplicates.push(displayRename(item["displayname"]));
					}
				}
			}
			increment = 0;
		}

		const output = Array.from(new Set(duplicates).values());

		fs.writeFileSync(
			"./pages/api/items/duplicates.json",
			JSON.stringify({
				data: output,
				timestamp: Date.now(),
			})
		);
	} catch {
        console.log('Not Local')
    }

	res.status(200).json({
		status: 200, //@ts-ignore
		data: JSON.parse(fs.readFileSync("./pages/api/items/duplicates.json")),
	});
}
