import Image from 'next/image'
import { useState } from 'react'

import ValidatorPopup from '../ValidatorPopup'

import styles from './styles.module.scss'

import downarrow from '../../../../public/assets/svgicons/downarrow.svg'

const Validators = () => {
  const data = [
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
    { rank: 1, name: 'Lorem Ipsum', validator: '0.00M', stake: '00.0M', commission: '10.00%' },
  ]

  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderTableData = () => {
    return data.map((item, index) => (
      <tr key={index} className={styles.row} onClick={() => setModal(true)}>
        <td>{item.rank}</td>
        <td>{item.name}</td>
        <td>{item.validator}</td>
        <td>{item.stake}</td>
        <td>{item.commission}</td>
      </tr>
    ))
  }



  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.columns}>
              <th>Rank <Image src={downarrow} alt='arrow' className={styles.img} /></th>
              <th>Name <Image src={downarrow} alt='arrow' className={styles.img} /></th>
              <th>Validator Total <Image src={downarrow} alt='arrow' className={styles.img} /></th>
              <th>My Stake <Image src={downarrow} alt='arrow' className={styles.img} /></th>
              <th>Commission <Image src={downarrow} alt='arrow' className={styles.img} /></th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      {modal &&
        <div className={styles.modalContainer}>
          <ValidatorPopup isOpen={openModal} onClose={closeModal} />
        </div>
      }
      </div>

    </>
  )
}

export default Validators