import FormInput from '@/components/FormInput/FormInput';
import { ScopeSelector } from '../ScopeSelector/ScopeSelector';
import { Signal } from '@preact/signals-react';

export const SecondPage = ({ data, actions, scopeMenu }: SecondPageProps) => {
  return (
    <>
      <div className="errorsWrapper">
        <ScopeSelector
          onClick={() => {
            scopeMenu.value = 'scopeSelector';
            actions.setError('scopeError', '');
            actions.setError('showScopeError', false);
          }}
          scopeState={data.scopeState}
          targetGroupIds={data.targetGroupIds}
          allGroupsSelected={data.allGroupsSelected}
          $inputError={data.errors.showScopeError && !!data.errors.scopeError}
        />
        <span className="errorMsg">
          {data.errors.showScopeError && data.errors.scopeError
            ? data.errors.scopeError
            : ''}
        </span>
      </div>
      <div className="errorsWrapper">
        <FormInput
          description=""
          placeholder="Description"
          value={data.description}
          onChange={(e) => {
            actions.setDescription(e.target.value);
            actions.setError('descriptionError', '');
            actions.setError('showDescriptionError', false);
          }}
          error={
            data.errors.showDescriptionError ? data.errors.descriptionError : ''
          }
        />
      </div>
    </>
  );
};

interface SecondPageProps {
  scopeMenu: Signal<string | null>;
  data: {
    description: string;
    scopeState: Signal<{
      none: boolean;
      personal: boolean;
      group: boolean;
      nonGroup: boolean;
    }>;
    targetGroupIds: Signal<string[]>;
    allGroupsSelected: Signal<boolean>;
    errors: {
      descriptionError: string;
      scopeError: string;
      showDescriptionError: boolean;
      showScopeError: boolean;
    };
  };
  actions: {
    setDescription: (description: string) => void;
    setError: (
      key:
        | 'amountError'
        | 'descriptionError'
        | 'spendingCycleError'
        | 'scopeError'
        | 'showAmountError'
        | 'showDescriptionError'
        | 'showSpendingCycleError'
        | 'showScopeError'
        | 'commencementDayError'
        | 'showCommencementDayError',
      value: string | boolean
    ) => void;
  };
}
