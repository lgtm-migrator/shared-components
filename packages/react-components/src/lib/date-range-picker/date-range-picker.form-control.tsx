import React, { useState, useEffect } from 'react';
import { format as formatDateFns } from 'date-fns';
import { Button, TextField } from '@map-colonies/react-core';
import '@map-colonies/react-core/dist/textfield/styles';

import DEFAULTS from '../models/defaults';
import { Popover } from '../popover';
import { DateTimeRangePicker } from './date-range-picker';

interface DateRangePickerProps {
  onChange: (dateRange: { from?: Date; to?: Date }) => void;
  from?: Date;
  to?: Date;
  dateFormat?: string;
  controlsLayout?: 'column' | 'row';
  local?:{
    setText?: string,
    startPlaceHolderText?: string,
    endPlaceHolderText?: string,
  }
}
export const DateTimeRangePickerFormControl: React.FC<DateRangePickerProps> = (props) => {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [dateFormat, setDateFormat] = useState<string>(DEFAULTS.DATE_PICKER.dateFormat);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickInput = (event: React.MouseEvent<HTMLInputElement>): void => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const controlsLayout = props.controlsLayout ?? 'column';

  useEffect(() => {
    setFrom(props.from ?? null);
  }, [props.from]);

  useEffect(() => {
    setTo(props.to ?? null);
  }, [props.to]);

  useEffect(() => {
    setDateFormat(props.dateFormat ?? DEFAULTS.DATE_PICKER.dateFormat);
  }, [props.dateFormat]);

  const startPlaceHolderText = props.local?.startPlaceHolderText ?? DEFAULTS.DATE_PICKER.local.startPlaceHolderText;
  const endPlaceHolderText = props.local?.endPlaceHolderText ?? DEFAULTS.DATE_PICKER.local.endPlaceHolderText;

  return (
    <>
      {/* <Button
        raised
        onClick={handleClick}
      >
        {`${from ? formatDateFns(from, dateFormat) : startPlaceHolderText} - ${to ? formatDateFns(to, dateFormat) : endPlaceHolderText}`}
      </Button> */}

      <TextField
        value = {`${from ? formatDateFns(from, dateFormat) : startPlaceHolderText} - ${to ? formatDateFns(to, dateFormat) : endPlaceHolderText}`}
        onClick={handleClickInput}
        trailingIcon={{
          icon: 'close',
          tabIndex: 0,
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
      >
        <DateTimeRangePicker
          controlsLayout={controlsLayout}
          contentWidth = {(anchorEl?.clientWidth ?? 0) - 32}
          dateFormat={dateFormat}
          local={props.local}
          from={from ?? undefined}
          to={to ?? undefined}
          onChange={({ from, to }): void => {
            setFrom(from ?? null);
            setTo(to ?? null);
            props.onChange({ from, to });
            // conflictsStore.searchParams.setDateRange(from, to);
            handleClose();
          }}
        />
      </Popover>
    </>
  );
};
