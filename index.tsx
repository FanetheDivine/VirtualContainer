import { CSSProperties, ReactNode, FC } from "react";
type Props = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /**容器在这个方向上不会退化 而是允许子元素自然展开  
   * 这个值的默认值是`'row'`  
   * 如果你在容器的内联样式上应用了flex布局  
   * 那么默认值改为与`flex-direction`的方向相同
   */
  direction?: 'column' | 'row';
  children?: ReactNode;
}
/**
 * *不会*被实际渲染的虚拟容器  
 * 它会退化为水平或竖直的线段 这会对定位产生一定影响
*/
const VirtualContainer: FC<Props> = (props) => {
  const containerStyle: CSSProperties = {
    width: 0,
    height: 0,
    overflow: 'visible',
  }
  if (props.direction === 'row') {
    containerStyle.width = 'auto';
  } else if (props.direction === 'column') {
    containerStyle.height = 'auto';
  } else if (props.style?.display === 'flex') {
    if (!props.style?.flexDirection || props.style?.flexDirection.search('row') !== -1) {
      containerStyle.width = 'auto';
    } else {
      containerStyle.height = 'auto';
    }
  } else {
    containerStyle.width = 'auto';
  }
  return (
    <div id={props.id} className={props.className} style={{ ...props.style, ...containerStyle }}>
      {props.children}
    </div>
  );
}

export default VirtualContainer;