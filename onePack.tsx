import React, {useState} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import * as Components from '@app/components';
import {translation, useNewTheme} from 'react-core';
import * as Icons from '@app/assets/svg';
import {variants} from 'app/components/label/types';
import {getStyles} from './styles';
import {TagSize, TagTypes} from 'app/components/tag/types';
import {
  TransactionDetailsDataProperties,
  TransactionDetailsScreenProperties,
} from './types';
import {
  breakWord,
  budgetingData,
  transactionDetailsData,
} from './transaction-details-utility';
import {shortcutsVariants} from 'app/components/shortcuts/types';

const OnepackTransactionDetails: React.FC<
  TransactionDetailsScreenProperties
> = ({navigation}) => {
  const theme = useNewTheme();
  const styles = getStyles({theme});
  const {t} = translation.useTranslation();
  const [selected, setSelected] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBudgeting, setFilteredBudgeting] = useState(budgetingData);
  const [visible, setVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filtered = budgetingData.filter(budget =>
      budget.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredBudgeting(filtered);
  };

  const handleBudgetToggle = ({
    item,
  }: {
    item: TransactionDetailsDataProperties;
  }) => {
    setVisible(!visible);
    setSelected(item.name);
  };

  function renderBudgetingItem({
    item,
  }: {
    item: TransactionDetailsDataProperties;
  }) {
    const isSelected = selected.includes(item.name);
    return (
      <View style={styles.listStyle}>
        <View style={styles.txtContainer}>
          <Components.Label
            id="lblBudgetTxt"
            variant={variants.bodyRegularM}
            style={styles.flagTxtStyle}
            text={item.name}
          />
        </View>
        <View>
          <Components.CustomRadioButton
            id="chkBudget"
            errorText=""
            disabled={false}
            icon={<Icons.Tick02 height={16} width={16} />}
            isChecked={isSelected}
            onPress={() => handleBudgetToggle({item})}
          />
        </View>
      </View>
    );
  }

  const shortcutData = [
    {
      id: '1',
      labelValue: t('TransactionDetailsLblDownload'),
      Icon: <Icons.Download05Icon />,
      onPress: () => console.log('Download clicked'),
      variant: shortcutsVariants.primary,
    },
    {
      id: '2',
      labelValue: t('TransactionDetailsLblShare'),
      Icon: <Icons.Share05Icon width={20} height={20} />,
      onPress: () => console.log('Share clicked'),
      variant: shortcutsVariants.primary,
    },
    {
      id: '3',
      labelValue: t('TransactionDetailsLblSplit'),
      Icon: <Icons.SharingIcon width={20} height={20} />,
      onPress: () => console.log('Split clicked'),
      variant: shortcutsVariants.primary,
    },
    {
      id: '4',
      labelValue: t('TransactionDetailsLblDispute'),
      Icon: <Icons.BubbleChatQuestionIcon />,
      onPress: () => console.log('Dispute clicked'),
      variant: shortcutsVariants.primary,
    },
  ];

  const renderJson = (data, keyPrefix = '') => {
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return (
            <View key={`${keyPrefix}${key}`} style={styles.rowContainer}>
              <Components.Label
                id="lblDetails"
                style={styles.lblDetailsStyle}
                variant={variants.bodyMediumM}
                text={breakWord(key)}
              />
              <View style={styles.subKeyContainer}>
                <View style={styles.rowContainer}>
                  {Object.entries(value).map(([subKey, subValue]) => {
                    if (subKey === 'currency' || subKey === 'exchangeRate') {
                      return (
                        <View
                          key={`${keyPrefix}${key}-${subKey}`}
                          style={styles.rowStyle}>
                          <Components.Label
                            id={`lbl${subKey}`}
                            style={styles.lblAccountTypeStyle}
                            variant={variants.bodyRegularXS}
                            text={breakWord(subKey)}
                          />
                          <Components.Label
                            id={`lbl${subKey}Value`}
                            style={styles.lblCurrentAccountStyle}
                            variant={variants.bodyRegularM}
                            text={String(subValue)}
                          />
                        </View>
                      );
                    } else {
                      return (
                        <View id="vwCol" style={styles.colStyle}>
                          <View style={styles.row}>
                            <Components.Label
                              id={`lbl${subKey}`}
                              style={styles.lblAccountTypeStyle}
                              variant={variants.bodyRegularXS}
                              text={breakWord(subKey)}
                            />
                            {subKey === 'referenceNumber' && (
                              <Icons.Copy01
                                color={
                                  theme.colors[
                                    'icon-interactive-primary-enabled'
                                  ]
                                }
                              />
                            )}
                          </View>
                          <Components.Label
                            id={`lbl${subKey}Value`}
                            style={styles.lblCurrentAccountStyle}
                            variant={variants.bodyRegularM}
                            text={String(subValue)}
                          />
                        </View>
                      );
                    }
                  })}
                </View>
              </View>
            </View>
          );
        }
      });
    }
  };

  return (
    <Components.ScreenContainer
      id="vwTransactionDetails"
      inverted
      showGoBackIcon
      showCenterContent
      centerContent={
        <Components.Label
          id="lblHearder"
          text={t('TransactionDetailLblTitle')}
          variant={variants.titleM}
          style={styles.lblHeader}
        />
      }>
      <View id="vwContainer" style={styles.containerStyle}>
        <View id="vwText" style={styles.textStyle}>
          <Icons.Costa3Icon />
          <View id="vwFrameAmount" style={styles.frameAmountStyle}>
            <Icons.SarSaudiRiyalIcon />
            <Components.Label
              id="lblAmount"
              text={t('TransactionDetailLblAmountTitle')}
              variant={variants.titleXL}
              style={styles.lblAmountStyle}
            />
            <View style={styles.lblDecimalStyle}>
              <Components.Label
                id="lblDecimal"
                text={t('.00')}
                variant={variants.titleM}
                style={styles.lblAmountStyle}
              />
            </View>
          </View>
          <Components.Label
            id="lblIban"
            style={styles.lblInfoStyle}
            variant={variants.bodyRegularM}
            text={t('TransactionDetailsLblIban')}
          />
          <Components.Tag
            id="btnActive"
            label={t('TransactionDetailsBtnTag')}
            type={TagTypes.success}
            size={TagSize.large}
            customContainerStyle={styles.tagStyle}
            customLabelStyle={styles.lblTagStyle}
          />
        </View>
        <View style={styles.shortcutStyle}>
          <Components.Shortcuts shortcuts={shortcutData} />
        </View>
        <View id="vwBody" style={styles.bodyStyle}>
          <Components.Dropdown
            id="ddBudgeting"
            placeholder={
              selected ? selected : t('TransactionDetailsDDBudgeting')
            }
            onPress={() => setVisible(true)}
            BottomSheet={
              <Components.BottomSheet id="btmSheetBudgeting" visible={visible}>
                <View id="vwBtmSheetLayout" style={styles.btmSheetLayout}>
                  <View id="vwDataContent" style={styles.dataContentStyle}>
                    <Components.Label
                      id="lblBudgeting"
                      style={styles.lblBudgeting}
                      variant={variants.titleM}
                      text={t('TransactionDetailsDDBudgeting')}
                    />
                    <View
                      id="vwSearchParentContent"
                      style={styles.searchParentStyle}>
                      <Components.SearchBar
                        placeholder={t('TransactionDetailsTxtSearchBudgeting')}
                        id="sbBottomSheet"
                        onChangeText={handleSearch}
                        value={searchQuery}
                      />
                      <Pressable
                        style={styles.iconStyle}
                        onPress={() => setVisible(!visible)}>
                        <Icons.CancelIcon />
                      </Pressable>
                    </View>
                    <FlatList
                      data={filteredBudgeting}
                      keyExtractor={item => item.id}
                      renderItem={renderBudgetingItem}
                      style={styles.listLayoutStyle}
                    />
                  </View>
                </View>
              </Components.BottomSheet>
            }
          />
          {renderJson(transactionDetailsData)}
        </View>
      </View>
    </Components.ScreenContainer>
  );
};

export {OnepackTransactionDetails};
