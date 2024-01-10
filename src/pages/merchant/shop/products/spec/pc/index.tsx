import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
interface PcSpecProps {
  fieldProps: Object;
  control: any;
}
const PcSpec: FC<PcSpecProps> = (props: PcSpecProps) => {
  const { fieldProps, control } = props;
  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.cpu"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="中央处理器"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.gpu"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="显卡"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.ram"
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
          name="pc_specs.storage"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="存储空间"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.storage_type"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="硬盘类型"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.ports"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="接口"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pc_specs.os"
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
          name="pc_specs.resolution"
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
          name="pc_specs.screen_size"
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
          name="pc_specs.battery"
          control={control}
          render={({ field }) => (
            <TextField
              id={field.name}
              label="电池"
              {...(fieldProps as any)}
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
export default PcSpec;
