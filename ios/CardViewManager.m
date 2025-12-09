#import "CardViewManager.h"
#import "CardView.h"
#import <React/RCTViewManager.h>

@implementation CardViewManager

RCT_EXPORT_MODULE(CardView)

- (UIView *)view {
  return [[CardView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(descriptionText, NSString)
RCT_EXPORT_VIEW_PROPERTY(titleColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(cardBackgroundColor, UIColor)

@end
