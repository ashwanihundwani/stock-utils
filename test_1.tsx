import React, {useState} from 'react';
import {View} from 'react-native';
import {Theme, translation, useNewTheme} from 'react-core';
import * as Components from '@app/components';
import {useFormik} from 'formik';
import {
  OnboardingAboutAddtionalIncomeInitialValues,
  OnboardingAboutAddtionalIncomeSchema,
} from 'app/features/onboarding/schemas/onboarding-about-addtional-income';
import {OnboardingRoutes} from '@app/constants';
import {
  Listitem,
  OnboardingAboutAddtionalIncomeScreenProperties,
} from './types';
import {getStyles} from './styles';
import {variants} from 'app/components/label/types';
import {userPrefence} from 'app/utils/session-handler';
import {ListType} from 'app/components/custom-flatlist-component/types';
import {IconTickWhite} from 'app/assets/svg/icon-tick-white';

const AboutAddtionalIncome: React.FC<
  OnboardingAboutAddtionalIncomeScreenProperties
> = ({navigation}) => {
  const theme: Theme = useNewTheme();
  const styles = getStyles(theme);

  const {t} = translation.useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeChips, setActiveChips] = useState('');
  const selection = userPrefence.getString('userSelection');
  const [rangedMonthlyIncomeValue, setRangedMonthlyIncomeValue] =
    useState<Listitem>();
  const [selectedId, setSelectedId] = useState<number>(0);

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: OnboardingAboutAddtionalIncomeInitialValues,
    validationSchema: OnboardingAboutAddtionalIncomeSchema,
    onSubmit: () => {
      //do nothing
    },
  });

  const rangeOFMonthlyIncome1 = [
    {id: 1, name: '0-5,000 SAR'},
    {id: 2, name: ' 5,000-15,000 SAR'},
    {id: 3, name: '15,000-30,000 SAR'},
    {id: 4, name: ' 30,000-50,000 SAR'},
    {id: 5, name: '50,000-100,000 SAR'},
    {id: 6, name: '100,000-500.000 SAR'},
    {id: 7, name: '+ 500,000 SAR'},
  ];
  const onPressChip = (value: string) => {
    setActiveChips(value);
  };

  const handleOnClick = () => {
    const selectedIncome = rangedMonthlyIncomeValue?.name?.trim();
    if (selection === 'DebitCard') {
      if (selectedIncome === '+ 500,000 SAR') {
        navigation.navigate(OnboardingRoutes.AdditionalIncomeAmount, {
          name: 'AdditionalIncomeAmount',
        });
      } else {
        navigation.navigate(OnboardingRoutes.TrustedContactDetails, {
          name: 'TrustedContactDetails',
        });
      }
    } else if (selection === 'CreditCard') {
      navigation.navigate(OnboardingRoutes.TrustedContactDetails, {
        name: 'TrustedContactDetails',
      });
    }
  };

  const handleMonthlyIncomeToggle = ({item}: {item: Listitem}) => {
    setSelectedId(item.id);
    setRangedMonthlyIncomeValue(item);
    setVisible(false);
    formik.setValues({
      ...formik.values,
      rangedMonthlyIncome: item.name,
    });
  };

  const renderMonthlyIncome = ({item}: {item: Listitem}) => {
    const isSelected = item.id === selectedId;
    return (
      <View style={styles.monthlyIncomeContainer}>
        <Components.Label
          id="monthlyIncomeLabel"
          text={item.name}
          variant={variants.bodyRegularM}
        />
        <Components.CustomRadioButton
          isChecked={isSelected}
          onPress={() => handleMonthlyIncomeToggle({item})}
          id="radioBtnMonthlyIncome"
          errorText=""
          disabled={false}
          icon={<IconTickWhite />}
          title=""
        />
      </View>
    );
  };

  return (
    <Components.ScreenContainer
      id="vwOnboardingAboutaddtionalIncome"
      showGoBackIcon
      bottomScreenContent={
        <View id="vwStickyButtonBar" style={styles.vwStickyButtonBar}>
          <Components.SubmitButton
            id="btnNext"
            inverted={false}
            disabled={!formik.dirty || activeChips === ''}
            label={t('OnboardingAboutAddtionalIncomeBtnNext')}
            onPress={handleOnClick}
          />
        </View>
      }>
      <View id="vwText" style={styles.container}>
        <Components.Label
          id="lblTitle"
          style={styles.lblTitleStyle}
          variant={variants.titleXL}
          text={t('OnboardingAboutAddtionalIncomeLblTitle')}
        />

        <Components.Label
          id="lblTitleMonthlyAnnual"
          style={styles.lblMonthlyAnnualStyle}
          variant={variants.bodyMediumM}
          text={t('OnboardingAboutAddtionalIncomeLblMonthlyAnnual')}
        />
        <View style={styles.chipsContainer}>
          <Components.Chips
            id="btnChipMonthly"
            selected={activeChips === 'Monthly'}
            label={t('OnboardingAboutAddtionalIncomeBtnChipMonthly')}
            onPress={onPressChip}
          />
          <Components.Chips
            id="btnChipAnnual"
            selected={activeChips === 'Annual'}
            label={t('OnboardingAboutAddtionalIncomeBtnChipAnnual')}
            onPress={onPressChip}
          />
        </View>

        <Components.Label
          id="lblErangeIncome"
          style={styles.lblErangeIncomeStyle}
          variant={variants.bodyMediumM}
          text={t('OnboardingAboutAddtionalIncomeLblRangeIncome')}
        />
        <Components.Dropdown
          id="ddMonthlyIncome"
          placeholder={t('OnboardingAboutAddtionalIncomeDdMonthlyIncome')}
          inputText={formik.values.rangedMonthlyIncome}
          errorText={formik.errors.rangedMonthlyIncome}
          onPress={() => setVisible(!visible)}
          BottomSheet={
            <Components.BottomSheet
              id="bsMonthlyIncome"
              visible={visible}
              closeButtonIcon
              title={t('OnboardingAboutAddtionalIncomeDdTitle')}
              onClose={() => setVisible(!visible)}>
              <Components.CustomFlatlistComponent
                id="monthlyIncomeList"
                type={ListType.CompactInverted}
                data={rangeOFMonthlyIncome1}
                inverted={false}
                customContainerStyle={styles.flatListContainer}
                renderItem={renderMonthlyIncome}
              />
            </Components.BottomSheet>
          }
        />
      </View>
    </Components.ScreenContainer>
  );
};

export default AboutAddtionalIncome;
