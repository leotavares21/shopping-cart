import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BiCreditCard } from 'react-icons/bi'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { Formik, Form, Field } from 'formik'
import { useProduct } from '../../contexts/ProductContext'

import styles from './styles.module.scss'

export default function Payment() {
  const router = useRouter()

  const {
    cartItems,
    setOpenSidebar,
    hasCartItems
  } = useProduct()

  useEffect(() => {
    setOpenSidebar(false)
    hasCartItems()
  }, [])

  useEffect(() => {
    hasCartItems()
  }, [cartItems.length])

  return (
    <div className={styles.paymentContainer}>
      <Head>
        <title>Concluir Pagamento</title>
      </Head>
      <h2>Pagamento</h2>

      <div className={styles.btnContainer}>
        <button type="button">
          <BiCreditCard className={styles.icon} /> Pagar com cartão
        </button>
        <button type="button" disabled>
          <BiCreditCard className={styles.icon} /> Pagar com Paypal
        </button>
      </div>

      <div className={styles.formContainer}>
        <button type="button">
          <FaCcVisa className={styles.icon} />
        </button>
        <button type="button">
          <FaCcMastercard className={styles.icon} />
        </button>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: ''
          }}
          onSubmit={() => console.log(null)}
        >
          <Form className={styles.form}>
            <label htmlFor="numberCard">Número do cartão</label>
            <Field
              id="numberCard"
              name="numberCard"
              placeholder="0000 - 0000 - 0000 - 0000"
            />

            <div>
              <label htmlFor="cvc">CVC</label>
              <Field id="cvc" name="cvc" placeholder="***" />
            </div>
            <div>
              <label htmlFor="month">Mês</label>
              <Field id="month" name="month" placeholder="0 0" />
            </div>
            <div>
              <label htmlFor="year">Ano</label>
              <Field id="year" name="year" placeholder="0 0" />
            </div>

            <Field id="name" name="name" placeholder="nd name" />
            <button type="submit" onClick={() => router.push('/pagamento')}>
              Pagar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
