import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function useNavigationCustom<T extends keyof RootStackParamList>() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, T>;

    return useNavigation<NavigationProp>();
}
