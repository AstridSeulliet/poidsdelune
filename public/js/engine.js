$(document).ready(function () {

	// Default active menu item
	let gl_selectedBody = 'moon'
	let gl_lastMass = 60
	let gl_lastSelectedBody = gl_selectedBody

	$(`.menu-item[data-body="${gl_selectedBody}"`).addClass('active')
	$('input[name="source"]').val(gl_lastMass)

	// Where the magic happens :P
	const mouuuuuu = () => {
		let sourceMass = $('input[name="source"]').val()
		if (sourceMass.match(/[-]?([0-9]+[.])?[0-9]+/ig) === null) {
			$('input[name="source"]').val('')
			$('input[name="target"]').val('')
			return
		}

		if (gl_selectedBody !== gl_lastSelectedBody || gl_lastMass !== sourceMass) {
			// XHR request
			$.getJSON(`/api/${gl_selectedBody}/${sourceMass}`, (res) => {
				if (res.status !== "success")
					return
				console.log(res)
				$('input[name="target"]').val(res.data.target.pseudomass)
			})
		}
		gl_lastSelectedBody = gl_selectedBody
		gl_lastMass = sourceMass
	}

	// Hit ENTER to trigger the computation
	$('body').keypress(function (e) {
		if (e.which == 13) {
			console.log('enter')
			mouuuuuu()
		}
	})

	// Menu item clicked, change the selected body
	$('.menu-item').click((el) => {
		gl_selectedBody = el.currentTarget.dataset.body
		if (gl_lastSelectedBody === gl_selectedBody)
			return
		$('.menu-item').removeClass('active')
		$(el.currentTarget).addClass('active')
		mouuuuuu()
	})

	// Hit submit to trigger the computation
	$('button[name="mouuuuuu"]').click(mouuuuuu);

	// When source input is unfocused
	$('input[name="source"]').focusout(mouuuuuu)

})