import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState({ titulo: '', pages: '', isbn: '', editora: '' })

  async function createLivro(event){
    event.preventDefault()

    const body = {
      titulo: livro.titulo,
      pages: Number(livro.pages),
      isbn: livro.isbn,
      editora: livro.editora
    };

      if (livro.titulo && livro.pages && livro.isbn && livro.editora) {
      try {
        const response = await LivrosService.createLivro(body);
        alert('Livro cadastrado com sucesso');
        document.getElementById('formulario').reset();
        setLivro({ titulo: '', pages: '', isbn: '', editora: '' });
      } catch (error) {
        const { status } = error.response;
        alert(`${status} - ${message}`);
      }
    } else {
      alert('Todos os campos são obrigatórios');
    }
  }

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={createLivro}>
            <div className='form-group'>
              <label>Título</label>
              <input type="text" id='titulo' required onChange={(event) => setLivro({ ...livro, titulo: event.target.value })} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="number" id='pages' required onChange={(event) => setLivro({ ...livro, pages: event.target.value })} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => setLivro({ ...livro, isbn: event.target.value })} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => setLivro({ ...livro, editora: event.target.value })} />
            </div>
            <div className='form-group'>
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  
}

export default LivrosCadastro