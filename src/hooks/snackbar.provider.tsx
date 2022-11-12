import {
	SnackbarProvider as NotistackProvider,
	useSnackbar,
	SnackbarProviderProps,
} from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactText } from 'react';

const CloseButton = ({ id }: { id: ReactText }) => {
	const { closeSnackbar } = useSnackbar();
	return (
		<IconButton style={{ color: 'white' }} onClick={() => closeSnackbar(id)}>
			<CloseIcon color='inherit' />
		</IconButton>
	);
};

const NotistackProviderFixed = NotistackProvider as unknown as React.FC<SnackbarProviderProps>;
export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => (
	<NotistackProviderFixed
		maxSnack={3}
		hideIconVariant
		preventDuplicate
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		action={key => <CloseButton key={key} id={key} />}
	>
		{children}
	</NotistackProviderFixed>
);
