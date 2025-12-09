#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface CardView : UIView

@property (nonatomic, strong, readonly) UILabel *titleLabel;
@property (nonatomic, strong, readonly) UILabel *descriptionLabel;

/// 快捷初始化
- (instancetype)initWithTitle:(nullable NSString *)title
                  description:(nullable NSString *)descriptionText;

/// 设置内容
- (void)setTitle:(nullable NSString *)title description:(nullable NSString *)descriptionText;

/// 可配置外观
@property (nonatomic, assign) CGFloat cornerRadius;
@property (nonatomic, strong) UIColor *cardBackgroundColor;
@property (nonatomic, strong) UIColor *titleColor;
@property (nonatomic, strong) UIColor *descriptionColor;

@end

NS_ASSUME_NONNULL_END
