//
//  RNTMapManager.m
//  rnProject
//
//  Created by admin on 2023/3/5.
//

#import "RNTMapManager.h"
#import "RCTConvert+Mapkit.h"
#import "RNTMapView.h"

#import "RNTMapMarket.h"

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsScale, BOOL)
// 是否显示罗盘
RCT_EXPORT_VIEW_PROPERTY(showsCompass, BOOL)
// 定义事件，类型RCTBubblingEventBlock
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapReady, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (UIView *)view {
  // 实例化一个MKMapView对象
  RNTMapView *map = [RNTMapView new];
  map.delegate = self;
  map.showsUserLocation = YES;
  // MKMapView doesn't report tap events, so we attach gesture recognizers to it
  UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleMapTap:)];
  // 绑定事件
  [map addGestureRecognizer:tap];
  return map;
}


#pragma mark MKMapViewDelegate

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
  if (mapView.hasStartedRendering) {
    [self _regionChanged:mapView];
  }
}

- (void)mapViewWillStartRenderingMap:(RNTMapView *)mapView {
  if (!mapView.hasStartedRendering) {
    mapView.onMapReady(@{});
    mapView.hasStartedRendering = YES;
  }
  [mapView beginLoading];
}

- (void)mapViewDidFinishRenderingMap:(RNTMapView *)mapView fullyRendered:(BOOL)fullyRendered {
  [mapView finishLoading];
}

#pragma mark Gesture Recognizer Handlers
-  (void)handleMapTap:(UITapGestureRecognizer *)recognizer {
  RNTMapView *map = (RNTMapView *)recognizer.view;
  
  CGPoint tapPoint = [recognizer locationInView:map];
  CLLocationCoordinate2D tapCoordinate = [map convertPoint:tapPoint toCoordinateFromView:map];
  MKMapPoint mapPoint = MKMapPointForCoordinate(tapCoordinate);
//  CGPoint mapPointAsCGP = CGPointMake(mapPoint.x, mapPoint.y);
  
  RNTMapMarket *marter = [[RNTMapMarket alloc] init];
  marter.title = @"标题";
  marter.subtitle = @"子标题";
  
  [map addAnnotation:marter];
  
  if (!map.onPress) return;
     map.onPress(@{
             @"coordinate": @{
                     @"latitude": @(tapCoordinate.latitude),
                     @"longitude": @(tapCoordinate.longitude),
             },
             @"position": @{
                     @"x": @(tapPoint.x),
                     @"y": @(tapPoint.y),
             },
     });
}

#pragma mark Private
- (void)_regionChanged:(RNTMapView *)mapView {
  [self _emitRegionChangeEvent:mapView continuous:YES];
}

- (void)_emitRegionChangeEvent:(RNTMapView *)mapView continuous:(BOOL)continuous {
  if (mapView.onRegionChange) {
    MKCoordinateRegion region = mapView.region;

#define FLUSH_NAN(value) (isnan(value) ? 0 : value)
    mapView.onRegionChange(@{
      @"continuous": @(continuous),
      @"region": @{
        @"latitude": @(FLUSH_NAN(region.center.latitude)),
        @"longitude": @(FLUSH_NAN(region.center.longitude)),
        @"latitudeDelta": @(FLUSH_NAN(region.span.latitudeDelta)),
        @"longitudeDelta": @(FLUSH_NAN(region.span.longitudeDelta)),
      }
    });
  }
}


@end
