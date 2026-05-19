import { Dimensions, Image, View } from "react-native";

export default function ScreenshotPhotos({ uri }: { uri: string }) {
    const { width } = Dimensions.get("window");
    const IMAGE_WIDTH = width * 0.8;

    return (
        <View style={{ width: IMAGE_WIDTH }}>
            <Image className="w-full h-64 rounded-lg bg-background-surface" resizeMode="cover" source={{ uri }} />
        </View>
    );
}