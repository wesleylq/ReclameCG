import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    position: 'absolute',
    marginTop: 25,
    backgroundColor: 'transparent',
    height: '20%',
    width: '100%',
    justifyContent: 'center', // eixo principal
    alignItems: 'center', // eixo secundário
  },
  callout: {
    alignSelf: 'center',
    width: '95%',
  },
  // Barra de pesquisa
  calloutView: {
    marginTop: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  // Input da barra de pesquisa
  calloutSearch: {
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  floatButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: '110%',
    marginRight: 10,
  },
  // Botão flutuante
  floatButton: {
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgb(232,76,61)',
    padding: 1,
    width: 55,
    height: 55,
    shadowColor: 'rgba(0,0,0, 0.7)',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    elevation: 4,
  },
  floatButtonText: {
    fontFamily: 'Solway-Bold',
    fontSize: 37,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryPanel: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    top: 0,
    bottom: 0,
    paddingTop: 30,
    paddingHorizontal: 30,
    marginHorizontal: 25,
    position: 'absolute',
    flex: 1,
  },
  modalTitle: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalDescription: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '900',
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  // Categorias
  categoryContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginVertical: 20,
    marginHorizontal: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 50,
    height: 50,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    fontSize: 12,
  },
  // Caixa de descrição
  boxDescription: {
    height: 100,
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: 'black',
    textAlignVertical: 'top',
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    textAlignVertical: 'top',
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  // Botões
  confirmButton: {
    backgroundColor: 'rgb(76, 176, 80)',
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: 'white',
  },
  // Painel de uma marcação
  complaintPanel: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 15,
    width: '90%',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 20,
    shadowColor: '#000000',
    elevation: 5,
  },
  complaintDataLabel: {
    fontFamily: 'Poppins-Regular',
    color: 'blue',
    fontSize: 18,
  },
  complaintData: {
    fontFamily: 'Sarabun-Regular',
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
});
