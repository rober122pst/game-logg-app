import { useAuthStore } from '@/store/useAuthStore';
import { RootStackParamList } from '@/types';
import { RouteProp, useRoute } from '@react-navigation/native';

export default function AuthCallbackScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'AuthCallback'>>();
    if (!route.params.token) {
        useAuthStore.getState().logout();
        return null;
    }

    const { token } = route.params;

    useAuthStore.getState().setToken(token);

    return null;
}
