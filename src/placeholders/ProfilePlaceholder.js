import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default function ProfilePlaceholder() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item
          width={100}
          height={100}
          borderRadius={100 / 2}
        />
        <SkeletonPlaceholder.Item marginTop={10} width={120} height={20} />
        <SkeletonPlaceholder.Item marginTop={10} width={80} height={20} />
        <SkeletonPlaceholder.Item marginTop={10} width={100} height={20} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
