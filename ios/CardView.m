#import "CardView.h"

@interface CardView ()
@property (nonatomic, strong) UIView *containerView;
@property (nonatomic, strong, readwrite) UILabel *titleLabel;
@property (nonatomic, strong, readwrite) UILabel *descriptionLabel;
@end

@implementation CardView

- (instancetype)init {
    return [self initWithTitle:nil description:nil];
}

- (instancetype)initWithTitle:(NSString *)title description:(NSString *)descriptionText {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        [self commonInit];
        if (title || descriptionText) {
            [self setTitle:title description:descriptionText];
        }
    }
    return self;
}

- (void)commonInit {
    self.translatesAutoresizingMaskIntoConstraints = NO;

    // 默认样式
    _cornerRadius = 12.0;
    _cardBackgroundColor = [UIColor whiteColor];
    _titleColor = [UIColor blackColor];
    _descriptionColor = [UIColor darkGrayColor];

    // container 用于 shadow 与圆角分离（避免剪切 shadow）
    _containerView = [[UIView alloc] initWithFrame:CGRectZero];
    _containerView.translatesAutoresizingMaskIntoConstraints = NO;
    _containerView.backgroundColor = _cardBackgroundColor;
    _containerView.layer.cornerRadius = _cornerRadius;
    _containerView.layer.masksToBounds = YES; // 内容裁剪到圆角
    [self addSubview:_containerView];

    // shadow 在 self 上绘制
    self.layer.shadowColor = [UIColor colorWithWhite:0 alpha:0.15].CGColor;
    self.layer.shadowOpacity = 1;
    self.layer.shadowRadius = 8;
    self.layer.shadowOffset = CGSizeMake(0, 4);
    self.layer.cornerRadius = _cornerRadius;
    self.backgroundColor = [UIColor clearColor];

    // titleLabel
    _titleLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    _titleLabel.translatesAutoresizingMaskIntoConstraints = NO;
    _titleLabel.font = [UIFont preferredFontForTextStyle:UIFontTextStyleHeadline];
    _titleLabel.textColor = _titleColor;
    _titleLabel.numberOfLines = 1;

    // descriptionLabel
    _descriptionLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    _descriptionLabel.translatesAutoresizingMaskIntoConstraints = NO;
    _descriptionLabel.font = [UIFont preferredFontForTextStyle:UIFontTextStyleBody];
    _descriptionLabel.textColor = _descriptionColor;
    _descriptionLabel.numberOfLines = 0;

    // contentView 放入 container
    UIView *contentView = [[UIView alloc] initWithFrame:CGRectZero];
    contentView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.containerView addSubview:contentView];

    [contentView addSubview:_titleLabel];
    [contentView addSubview:_descriptionLabel];

    // 布局约束
    CGFloat padding = 16.0;
    [NSLayoutConstraint activateConstraints:@[
        // container 填满 self，留出 shadow 空间（shadow 在 self 上）
        [self.containerView.topAnchor constraintEqualToAnchor:self.topAnchor],
        [self.containerView.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
        [self.containerView.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
        [self.containerView.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],

        // contentView 在 container 内有内边距
        [contentView.topAnchor constraintEqualToAnchor:self.containerView.topAnchor constant:padding],
        [contentView.leadingAnchor constraintEqualToAnchor:self.containerView.leadingAnchor constant:padding],
        [contentView.trailingAnchor constraintEqualToAnchor:self.containerView.trailingAnchor constant:-padding],
        [contentView.bottomAnchor constraintEqualToAnchor:self.containerView.bottomAnchor constant:-padding],

        // titleLabel 顶部
        [self.titleLabel.topAnchor constraintEqualToAnchor:contentView.topAnchor],
        [self.titleLabel.leadingAnchor constraintEqualToAnchor:contentView.leadingAnchor],
        [self.titleLabel.trailingAnchor constraintEqualToAnchor:contentView.trailingAnchor],

        // descriptionLabel 在 title 下方
        [self.descriptionLabel.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:8.0],
        [self.descriptionLabel.leadingAnchor constraintEqualToAnchor:contentView.leadingAnchor],
        [self.descriptionLabel.trailingAnchor constraintEqualToAnchor:contentView.trailingAnchor],
        [self.descriptionLabel.bottomAnchor constraintEqualToAnchor:contentView.bottomAnchor]
    ]];

    // Accessibility
    self.isAccessibilityElement = NO;
    self.titleLabel.isAccessibilityElement = YES;
    self.descriptionLabel.isAccessibilityElement = YES;

    // 响应动态字体
    _titleLabel.adjustsFontForContentSizeCategory = YES;
    _descriptionLabel.adjustsFontForContentSizeCategory = YES;
}

#pragma mark - setters

- (void)setTitle:(NSString *)title description:(NSString *)descriptionText {
    self.titleLabel.text = title ?: @"213";
    self.descriptionLabel.text = descriptionText ?: @"345";
}

- (void)setCornerRadius:(CGFloat)cornerRadius {
    _cornerRadius = cornerRadius;
    self.containerView.layer.cornerRadius = cornerRadius;
    self.layer.cornerRadius = cornerRadius;
}

- (void)setCardBackgroundColor:(UIColor *)cardBackgroundColor {
    _cardBackgroundColor = cardBackgroundColor;
    self.containerView.backgroundColor = cardBackgroundColor;
}

- (void)setTitleColor:(UIColor *)titleColor {
    _titleColor = titleColor;
    self.titleLabel.textColor = titleColor;
}

- (void)setDescriptionColor:(UIColor *)descriptionColor {
    _descriptionColor = descriptionColor;
    self.descriptionLabel.textColor = descriptionColor;
}
- (void)setTitle:(NSString *)title {
    self.titleLabel.text = title;
}

- (void)setDescriptionText:(NSString *)descriptionText {
    self.descriptionLabel.text = descriptionText;
}
@end
