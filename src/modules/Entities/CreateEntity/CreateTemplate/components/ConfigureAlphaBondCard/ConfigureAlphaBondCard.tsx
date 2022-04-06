import styled from 'styled-components'
import { ObjectFieldConfigureAlphaBondColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import React, { FunctionComponent, useState } from 'react'
import { customControls } from 'common/components/JsonForm/types'
import { FormCardProps } from 'modules/Entities/CreateEntity/types'
import { AlphaBondInfo } from '../../types'
import { useSelector } from 'react-redux'
import { selectCurrencies } from 'modules/relayer/relayer.selectors'
import { FormValidation } from '@rjsf/core'
import CreateBondModal from 'common/components/ControlPanel/Actions/CreateBondModal'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'

const SubmitButton = styled.button`
  border: 1px solid #56ccf2;
  border-radius: 4px;
  color: #49bfe0;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  background: transparent;
  width: 115px;
  height: 50px;
`
interface Props extends FormCardProps {
  formData: AlphaBondInfo
}

const ExistingEntityCard: FunctionComponent<Props> = ({
  formData,
  handleUpdateContent,
  handleError,
}) => {
  const [createBondModalOpen, setCreateBondModalOpen] = useState(false)
  const currencies = useSelector(selectCurrencies)

  const schema = {
    type: 'object',
    required: [
      'token',
      'name',
      'controllerDid',
      'reserveToken',
      'txFeePercentage',
      'exitFeePercentage',
      'feeAddress',
      'reserveWithdrawalAddress',
      'maxSupply',
      'initialPrice',
      'initialSupply',
      'baseCurveShape',
      'allowSells',
      'allowReserveWithdrawals',
      'outcomePayment',
    ],
    properties: {
      baseBondingCurve: {
        type: 'string',
        title: 'Base Bonding Curve',
      },
      token: {
        type: 'string',
        title: 'Bond Token',
      },
      name: {
        type: 'string',
        title: 'Bond Title',
      },
      controllerDid: {
        type: 'string',
        title: 'Bond Controller',
      },
      reserveToken: {
        type: 'string',
        title: 'Reserve Token',
        enum: currencies.map((currency) => currency.coinMinimalDenom),
        enumNames: currencies.map((currency) =>
          currency.coinMinimalDenom.toUpperCase(),
        ),
      },
      txFeePercentage: {
        type: 'number',
        title: 'Transaction Fee',
      },
      exitFeePercentage: {
        type: 'number',
        title: 'Settlement Fee',
      },
      feeAddress: {
        type: 'string',
        title: 'Fee Payment Address',
      },
      reserveWithdrawalAddress: {
        type: 'string',
        title: 'Reserve Withdrawal Account',
      },
      maxSupply: {
        type: 'number',
        title: 'Maximum Token Supply',
      },
      initialPrice: {
        type: 'number',
        title: 'Initial Token Price',
      },
      initialFundingPool: {
        type: 'number',
        title: 'Initial Funding Allocated',
      },
      initialSupply: {
        type: 'number',
        title: 'Initial Token Supply',
      },
      baseCurveShape: {
        type: 'number',
        title: 'Base Curve Shape',
      },
      orderQuantityLimits: {
        type: 'number',
        title: 'Order Quantity Limits',
      },
      allowSells: {
        type: 'boolean',
        label: 'Allow Sells',
        title: ' ',
      },
      allowReserveWithdrawals: {
        type: 'boolean',
        label: 'Allow Reserve Withdrawals',
        title: ' ',
      },
      outcomePayment: {
        type: 'number',
        title: 'Outcome Payment',
      },
    },
  }

  const uiSchema = {
    baseBondingCurve: {
      'ui:widget': customControls['basebondingcurve'],
    },
    token: {
      'ui:widget': 'text',
      'ui:placeholder': 'Type a DENOM',
    },
    name: {
      'ui:widget': 'text',
      'ui:placeholder': 'Type a Name',
    },
    controllerDid: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid DID',
    },
    reserveToken: {
      'ui:placeholder': 'Select a Token',
    },
    txFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    exitFeePercentage: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    feeAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
    },
    reserveWithdrawalAddress: {
      'ui:widget': 'text',
      'ui:placeholder': 'Paste a valid Account Address',
    },
    maxSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    initialPrice: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount/Token',
    },
    initialFundingPool: {
      'ui:widget': 'text',
      'ui:placeholder': 'Percentage',
    },
    initialSupply: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    baseCurveShape: {
      'ui:widget': 'text',
      'ui:placeholder': 'K-Value',
    },
    orderQuantityLimits: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
    allowSells: {
      'ui:widget': customControls['inlineswitch'],
      'ui:options': {
        label: false,
      },
    },
    allowReserveWithdrawals: {
      'ui:widget': customControls['inlineswitch'],
      'ui:options': {
        label: false,
      },
    },
    outcomePayment: {
      'ui:widget': 'text',
      'ui:placeholder': 'Amount',
    },
  }

  const validate = (formData: any, errors: FormValidation): FormValidation => {
    const { txFeePercentage, exitFeePercentage } = formData

    if (txFeePercentage > 100) {
      errors.txFeePercentage.addError('Invalid Percentage format!')
    }
    if (exitFeePercentage > 100) {
      errors.exitFeePercentage.addError('Invalid Percentage format!')
    }

    return errors
  }

  return (
    <>
      <MultiControlForm
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        validate={validate}
        onSubmit={(): void => {
          setCreateBondModalOpen(true)
        }}
        onError={handleError}
        onFormDataChange={handleUpdateContent}
        customObjectFieldTemplate={ObjectFieldConfigureAlphaBondColumn}
      >
        <div className="d-flex flex-row-reverse">
          <SubmitButton type="submit">Create</SubmitButton>
        </div>
      </MultiControlForm>
      <ModalWrapper
        isModalOpen={createBondModalOpen}
        header={{
          title: 'Create a Bond',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreateBondModalOpen(false)}
      >
        <CreateBondModal alphaBondInfo={formData} />
      </ModalWrapper>
    </>
  )
}

export default ExistingEntityCard
