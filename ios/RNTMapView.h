#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView <MKMapViewDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;
@property (nonatomic, copy) RCTBubblingEventBlock onMapReady;
@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, assign) BOOL hasStartedRendering;


- (void)beginLoading;
- (void)finishLoading;

@end

