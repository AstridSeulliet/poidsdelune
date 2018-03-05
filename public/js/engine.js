$(document).ready(function () {

	// Default active menu item
	let gl_selectedBody = 'moon'
	$(`.menu-item[data-body="${gl_selectedBody}"`).addClass('active')

	// Hit ENTER to trigger the computation
	$('body').keypress(function (e) {
		if (e.which == 13) {
			console.log('enter')
			$('button[name="mouuuuuu"]').click()
		}
	})

	// Change menu item body
	$('.menu-item').click((el) => {
		console.log(gl_selectedBody)
		gl_selectedBody = el.currentTarget.dataset.body
		$('.menu-item').removeClass('active')
		$(el.currentTarget).addClass('active')
	})

	// Hit submit to trigger the computation
	$('button[name="mouuuuuu"]').click(() => {
		let sourceWeight = $('input[name="source"]').val()
		if (sourceWeight.match(/^\d+$/ig) === null) {
			$('input[name="source"]').val('')
			$('input[name="target"]').val('')
			return
		}

		$.getJSON(`/api/${gl_selectedBody}/${sourceWeight}`, (data) => {
			console.log(data)
			$('input[name="target"]').val(data.result.target.pseudomass)
		})
	})
})