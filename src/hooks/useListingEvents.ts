import { useEffect, useRef } from "react";
import type { Listing } from "../types";

export type ListingEvent =
	| { type: "connected" }
	| { type: "bid"; listing: Listing }
	| { type: "closed"; listing: Listing };

export function useListingEvents(onEvent: (event: ListingEvent) => void) {
	const handler = useRef(onEvent);

	useEffect(() => {
		handler.current = onEvent;
	});

	useEffect(() => {
		const source = new EventSource("/api/events");

		source.onmessage = (e) => {
			handler.current(JSON.parse(e.data) as ListingEvent);
		};

		return () => source.close();
	}, []);
}
