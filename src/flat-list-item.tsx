/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, FunctionComponent, ReactNode } from 'react';
import { LinkWrapper, LinkWrapperProps } from './link-wrapper';

export interface SectionOptions {
  style?: React.CSSProperties;
  className?: string;
}

export interface FlatListItemProps {
  title: string | ReactNode;
  url?: string;
  onClick?: () => void;
  className?: string;
  contentClassName?: string;
  actionIcon?: ReactNode;
  subtitleRight?: string | ReactNode;
  subtitleRightClassName?: string;
  subtitleLeft?: string | ReactNode;
  subtitleCenterClassName?: string;
  imageLeft?: string | ReactNode;
  imageLeftOptions?: Partial<JSX.IntrinsicElements['img']>;
  imageRight?: string | ReactNode;
  imageRightOptions?: Partial<JSX.IntrinsicElements['img']>;
  left?: ReactNode;
  leftOptions?: SectionOptions;
  center?: ReactNode;
  right?: ReactNode;
  rightOptions?: SectionOptions;
  urlIsExternal?: boolean;
  height?: string;
  LinkComponent?: LinkWrapperProps['LinkComponent'];
  component?:
    | FunctionComponent<{ children?: ReactNode; className?: string; onClick?: (e: any) => void }>
    | string;
}

export const FlatListItem: FC<FlatListItemProps> = ({
  title,
  className,
  contentClassName = 'flat-list-item-content',
  actionIcon,
  imageLeft,
  imageLeftOptions,
  imageRight,
  imageRightOptions,
  onClick,
  left,
  leftOptions,
  right,
  rightOptions,
  center,
  subtitleLeft,
  subtitleRight,
  url,
  urlIsExternal,
  height = '56px',
  LinkComponent,
  component,
}) => {
  const hasAction = onClick != null || url != null;
  const hasActionIcon = actionIcon && hasAction;
  const hasRight = imageRight != null || subtitleRight != null || right != null || hasActionIcon;
  const Component = component ?? 'li';
  const el = (
    <div className={contentClassName} style={{ height }}>
      <div
        className={`flat-list-item-content-left ${leftOptions?.className ?? ''}`}
        style={leftOptions?.style}
      >
        {left}
        {typeof imageLeft === 'string' ? (
          <img {...imageLeftOptions} alt={imageLeftOptions?.alt ?? ''} src={imageLeft} />
        ) : (
          imageLeft
        )}
        <div className="flat-list-item-content-left-text-container">
          {typeof title === 'string' ? (
            <div className="flat-list-item-content-left-title">{title}</div>
          ) : (
            title
          )}
          {typeof subtitleLeft === 'string' ? (
            <div className="flat-list-item-content-left-subtitle">{subtitleLeft}</div>
          ) : (
            subtitleLeft
          )}
        </div>
      </div>
      {center}
      {hasRight && (
        <div
          className={`flat-list-item-content-right ${rightOptions?.className ?? ''}`}
          style={rightOptions?.style}
        >
          {typeof imageRight === 'string' ? (
            <img {...imageRightOptions} alt={imageLeftOptions?.alt ?? ''} src={imageRight} />
          ) : (
            imageRight
          )}
          {typeof subtitleRight === 'string' ? (
            <div className="flat-list-item-content-right-subtitle">{subtitleRight}</div>
          ) : (
            subtitleRight
          )}
          {right}
          {hasActionIcon && (
            <div className="flat-list-item-content-right-action-icon">{actionIcon}</div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <Component
      className={`flat-list-item ${hasAction ? ' flat-list-item-with-action' : ''} ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      <LinkWrapper isExternal={urlIsExternal} LinkComponent={LinkComponent} url={url}>
        {el}
      </LinkWrapper>
    </Component>
  );
};
