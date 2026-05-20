import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function useNavigationCustom(currentRoute: keyof RootStackParamList) {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList, typeof currentRoute>;
    return useNavigation<NavigationProp>();
}