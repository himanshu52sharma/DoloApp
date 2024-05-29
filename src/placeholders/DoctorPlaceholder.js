import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default function DoctorPlaceholder() {
  return (
    <View
      style={{
        marginBottom: 15,
        marginTop:20
      }}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={80} height={80} borderRadius={15} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item width={width * 0.6} height={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
