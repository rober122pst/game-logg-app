export const ratingColor = (rating: number) => {
    if (!rating) return '#ef4444';

    if (rating < 3) {
        return '#ef4444';
    } else if (rating < 5) {
        return '#d9d9d9';
    } else if (rating < 8) {
        return '#72b4a9';
    } else if (rating < 11) {
        return '#e0055d';
    } else if (rating === 11) {
        return '#e06b05';
    }
    return '#d9d9d9';
};
