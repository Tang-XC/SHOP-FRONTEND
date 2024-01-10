import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
interface PhoneSpecProps {
  fieldProps: Object;
  control: any;
}
const PhoneSpec: FC<PhoneSpecProps> = (props: PhoneSpecProps) => {
  const { fieldProps, control } = props;
  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.screen_size"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="屏幕尺寸"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.resolution"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="分辨率"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.processor"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="处理器"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.storage"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="存储"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.ram"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="内存"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.front_camera"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="前置摄像头"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.rear_camera"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="后置摄像头"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.battery"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="电池容量"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.os"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="操作系统"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="phone_specs.network_support"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="网络支持"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
export default PhoneSpec;
