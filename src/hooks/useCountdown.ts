import { useEffect, useState } from "react";

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function msUntil(endsAt: string): number {
	return Math.max(0, new Date(endsAt).getTime() - Date.now());
}

function tickRate(remaining: number): number {
	if (remaining < MINUTE) return 500;
	if (remaining < HOUR) return SECOND;
	return 30 * SECOND;
}

export function formatTimeRemaining(remaining: number): string {
	if (remaining <= 0) return "Ended";

	if (remaining < MINUTE) {
		return `${Math.ceil(remaining / SECOND)}s left`;
	}
	if (remaining < HOUR) {
		const minutes = Math.floor(remaining / MINUTE);
		const seconds = Math.floor((remaining % MINUTE) / SECOND);
		return `${minutes}m ${seconds}s left`;
	}
	if (remaining < DAY) {
		const hours = Math.floor(remaining / HOUR);
		const minutes = Math.floor((remaining % HOUR) / MINUTE);
		return `${hours}h ${minutes}m left`;
	}

	const days = Math.floor(remaining / DAY);
	const hours = Math.floor((remaining % DAY) / HOUR);
	return `${days}d ${hours}h left`;
}

export function useCountdown(endsAt: string): number {
	const [remaining, setRemaining] = useState(() => msUntil(endsAt));

	useEffect(() => {
		let timer: number;

		const tick = () => {
			const next = msUntil(endsAt);
			setRemaining(next);
			if (next <= 0) return;
			timer = window.setTimeout(tick, tickRate(next));
		};

		tick();

		return () => window.clearTimeout(timer);
	}, [endsAt]);

	return remaining;
}
