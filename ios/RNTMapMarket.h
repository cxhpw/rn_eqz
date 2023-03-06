//
//  RNTMapMarket.h
//  rnProject
//
//  Created by admin on 2023/3/6.
//

#import <MapKit/MapKit.h>
#import <UIKit/UIKit.h>

#import "RNTMapView.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNTMapMarket : MKAnnotationView <MKAnnotation>

@property (nonatomic, weak) RNTMapView *map;


@property (nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *subtitle;

@end

NS_ASSUME_NONNULL_END
