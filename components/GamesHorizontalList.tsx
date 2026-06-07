import { GameType } from '@/types';
import { FlatList } from 'react-native';
import GameCover from './GamesCover';

export default function GamesHorizontalList({
    games,
    ratings,
}: {
    games: GameType[] | undefined;
    ratings?: (number | undefined)[];
}) {
    return (
        <FlatList
            className="rounded-lg"
            data={games}
            renderItem={({ item, index }) => <GameCover game={item} overall={ratings?.[index]} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 32 }}
        />
    );
}
