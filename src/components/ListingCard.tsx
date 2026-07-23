import { formatTimeRemaining, useCountdown } from "../hooks/useCountdown";
import type { Listing } from "../types";

interface Props {
	listing: Listing;
	isSelected: boolean;
	onClick: () => void;
}

export default function ListingCard({ listing, isSelected, onClick }: Props) {
	const remaining = useCountdown(listing.endsAt);
	const closed = listing.status === "closed" || remaining <= 0;

	return (
		<div
			className={`listing-card ${isSelected ? "listing-card--selected" : ""} ${closed ? "listing-card--closed" : ""}`}
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
		>
			<img
				src={listing.imageUrl}
				alt={listing.title}
				className="listing-card__image"
			/>
			<div className="listing-card__body">
				<span className={`badge badge--${listing.category}`}>
					{listing.category}
				</span>
				<h3 className="listing-card__title">{listing.title}</h3>
				<div className="listing-card__bid">
					Current bid: <strong>${listing.currentBid.toLocaleString()}</strong>
				</div>
				<div
					className={`listing-card__time ${closed ? "listing-card__time--ended" : ""}`}
				>
					{closed ? "Ended" : formatTimeRemaining(remaining)}
				</div>
			</div>
		</div>
	);
}
