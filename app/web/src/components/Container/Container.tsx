import { MainTheme } from '@src/config/theme';
import { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode,
  className?: string
}
const Container = ({ className, children }: IContainerProps) => (
  <div
    className={className}
    style={{
      borderWidth: 2,
      borderColor: MainTheme.borderPrimaryColorBorder,
      backgroundColor: MainTheme.cardPrimaryBackgroundColor,
      borderRadius: 10
    }}>
    {children}
  </div>
)

export default Container;