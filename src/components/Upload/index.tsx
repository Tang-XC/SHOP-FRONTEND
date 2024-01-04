import { FC, useEffect, useState } from 'react';
import { FormControl, FormLabel, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

interface fileListItem {
  uid: string;
  name: string;
  url: string;
  originFileObj?: File;
  status?: 'uploading' | 'done';
  type?: string;
  size?: number;
}
interface UploadProps {
  label: string;
  value?: { file: File; fileList: fileListItem[] };
  children?: React.ReactNode;
  name?: string;
  listType?: 'text' | 'picture' | 'picture-card';
  fileList?: fileListItem[];
  multiple?: boolean;
  onChange?: (val: { file: File; fileList: fileListItem[] }) => void;
}
interface PictureCardFileListItemProp {
  children?: React.ReactNode;
}
interface PictureCardFileListWrapperProp {
  children?: React.ReactNode;
}
const PictureCardFileListWrapper: FC<PictureCardFileListWrapperProp> = (
  props: PictureCardFileListWrapperProp
) => {
  const { children } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 2,
      }}>
      {children}
    </Box>
  );
};
const PictureCardFileListItem: FC<PictureCardFileListItemProp> = (
  props: PictureCardFileListItemProp
) => {
  const { children } = props;
  return (
    <Box
      sx={{
        width: 150,
        height: 150,
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'primary.main',
        '&:hover': {
          border: 3,
          transform: 'scale(1.04)',
          borderStyle: 'dashed',
          borderColor: 'divider',
          boxSizing: 'border-box',
        },
      }}>
      {children ? children : <AddIcon />}
    </Box>
  );
};
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const Upload: FC<UploadProps> = (props: UploadProps) => {
  const {
    label = '',
    children,
    listType,
    fileList = [],
    multiple,
    value,
    onChange,
  } = props;
  const [fileListState, setFileListState] = useState<fileListItem[]>(
    value === undefined ? [] : value.fileList
  );
  const FileListStateSetter = (fileList: File[]) => {
    fileList.forEach((item) => {
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = () => {
        const fileListItem: fileListItem = {
          uid: item.name,
          name: item.name,
          url: reader.result as string,
          status: 'uploading',
          originFileObj: item,
          type: item.type,
          size: item.size,
        };
        setFileListState((prev) => {
          onChange?.({
            file: item,
            fileList: [...prev, fileListItem],
          });
          return [...prev, fileListItem];
        });
      };
    });
  };
  const handleChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = val.target;
    if (files) {
      FileListStateSetter(Array.from(files));
    }
  };
  useEffect(() => {
    setFileListState(value === undefined ? [] : value.fileList);
  }, [props.value]);
  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{
        width: '100%',
      }}>
      <FormLabel
        component="legend"
        sx={{
          mb: 2,
        }}>
        {label}
      </FormLabel>
      {listType === 'picture-card' && (
        <PictureCardFileListWrapper>
          {fileListState.map((item) => {
            return (
              <PictureCardFileListItem key={item.uid}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={item.url}
                  alt={item.name}
                />
              </PictureCardFileListItem>
            );
          })}
          <PictureCardFileListItem>
            <IconButton component="label">
              {children}
              <VisuallyHiddenInput
                type="file"
                multiple={multiple}
                onChange={handleChange.bind(this)}
              />
            </IconButton>
          </PictureCardFileListItem>
        </PictureCardFileListWrapper>
      )}
    </FormControl>
  );
};
export default Upload;
