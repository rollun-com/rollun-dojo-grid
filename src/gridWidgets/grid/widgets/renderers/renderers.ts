import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';

export function dateTimeToHumanFriendlyNameRenderer(value: string): DNode {
	const miliseconds = parseInt(value, 10) * 1000;
	return (new Date(miliseconds)).toUTCString();
}

export function linkToImageRenderer(link: string): DNode {
	return v('img',
		{
			src: link,
			styles: {
				maxHeight: '500px',
				maxWidth: '500px'
			}
		}
	);
}
