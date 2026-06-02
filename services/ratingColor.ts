export const ratingColor = (rating: number) => {
    if (!rating) return 'text-text-primary';
    console.log(rating);
    if (rating < 3) {
        return '#ef4444';
    } else if (rating < 5) {
        return '#d9d9d9';
    } else if (rating < 7.5) {
        return '#72b4a9';
    } else if (rating < 9.9) {
        return '#e0055d';
    } else if (rating === 10) {
        return '#e06b05';
    }
    return '#d9d9d9';
};
