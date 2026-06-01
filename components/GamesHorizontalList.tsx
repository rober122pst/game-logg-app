import { GameType } from '@/types';
import { FlatList } from 'react-native';
import GameCover from './GamesCover';

export default function GamesHorizontalList({ games }: { games: GameType[] | undefined }) {
    return (
        <FlatList
            className="rounded-lg"
            data={games}
            renderItem={({ item }) => <GameCover game={item} name={item.title} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 32 }}
        />
    );
}
