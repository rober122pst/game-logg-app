import { Image, View } from "react-native";

import DefaultAvatar from "assets/placeholder/avatar.jpg";
import { useMe } from "hooks/userHooks";

export default function Avatar({ size = 64 }: { size?: number }) {
    const { data } = useMe();

    return (
        <View className="rounded-full border border-raspberry" style={{ width: size, height: size }}>
            <Image
                source={data?.profile?.avatar ? { uri: data.profile.avatar } : DefaultAvatar}
                className="w-full h-full rounded-full"
            />
        </View>
    )
}