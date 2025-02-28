import styles from './card.module.scss';

const Card = ({children, cardClass}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Card